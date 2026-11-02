import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactError, sendContactMessage } from './contactService.js'

afterEach(() => vi.unstubAllGlobals())

const env = {
  supabaseUrl: 'https://abc.supabase.co',
  supabaseAnonKey: 'sb_publishable_teste',
  emailjsServiceId: 'service_1',
  emailjsTemplateId: 'template_1',
  emailjsPublicKey: 'public_1',
}
const values = {
  name: ' Ana ',
  email: ' ana@exemplo.com ',
  message: ' Mensagem de teste com mais de vinte letras. ',
}
const ok = () => new Response(null, { status: 201 })

function stubFetch(handler) {
  const mock = vi.fn(handler)
  vi.stubGlobal('fetch', mock)
  return mock
}

describe('sendContactMessage', () => {
  it('salva no Supabase e depois envia o e-mail, com os textos sem espaços nas pontas', async () => {
    const fetchMock = stubFetch(async () => ok())

    const result = await sendContactMessage(values, { env })

    expect(result).toEqual({ emailSent: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [saveUrl, saveInit] = fetchMock.mock.calls[0]
    expect(saveUrl).toBe('https://abc.supabase.co/rest/v1/contact_messages')
    expect(JSON.parse(saveInit.body)).toEqual({
      name: 'Ana',
      email: 'ana@exemplo.com',
      message: 'Mensagem de teste com mais de vinte letras.',
    })
    expect(saveInit.headers.apikey).toBe('sb_publishable_teste')
    expect(saveInit.headers.Authorization).toBeUndefined()
    const [emailUrl, emailInit] = fetchMock.mock.calls[1]
    expect(emailUrl).toContain('emailjs.com')
    expect(JSON.parse(emailInit.body)).toMatchObject({
      service_id: 'service_1',
      template_id: 'template_1',
      user_id: 'public_1',
      template_params: { from_name: 'Ana', reply_to: 'ana@exemplo.com' },
    })
  })

  it('usa Authorization só com chave antiga (JWT)', async () => {
    const fetchMock = stubFetch(async () => ok())
    await sendContactMessage(values, { env: { ...env, supabaseAnonKey: 'eyJhbGciOi.x.y' } })
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer eyJhbGciOi.x.y')
  })

  it('não envia e-mail se o banco recusar, e o erro sobe', async () => {
    const fetchMock = stubFetch(async () => new Response('{}', { status: 401 }))

    const error = await sendContactMessage(values, { env }).catch((err) => err)

    expect(error).toBeInstanceOf(ContactError)
    expect(error.kind).toBe('save')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('trata falha de rede ao salvar como erro de salvamento', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    const error = await sendContactMessage(values, { env }).catch((err) => err)
    expect(error.kind).toBe('save')
  })

  it('considera a mensagem enviada mesmo se o e-mail falhar (já está salva)', async () => {
    stubFetch(async (url) =>
      String(url).includes('emailjs') ? new Response('erro', { status: 400 }) : ok(),
    )
    await expect(sendContactMessage(values, { env })).resolves.toEqual({ emailSent: false })
  })

  it('considera a mensagem salva se o e-mail falhar por rede', async () => {
    stubFetch(async (url) => {
      if (String(url).includes('emailjs')) throw new TypeError('Failed to fetch')
      return ok()
    })
    await expect(sendContactMessage(values, { env })).resolves.toEqual({ emailSent: false })
  })

  it('só salva quando o EmailJS não está configurado', async () => {
    const fetchMock = stubFetch(async () => ok())
    const result = await sendContactMessage(values, { env: { ...env, emailjsPublicKey: '' } })
    expect(result).toEqual({ emailSent: false })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('avisa quando faltam as variáveis do Supabase, sem chamar a rede', async () => {
    const fetchMock = stubFetch(async () => ok())
    const error = await sendContactMessage(values, { env: { ...env, supabaseUrl: '' } }).catch(
      (err) => err,
    )
    expect(error.kind).toBe('config')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
