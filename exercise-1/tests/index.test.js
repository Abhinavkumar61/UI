
describe('Testing functions from scripts', () => {
  beforeEach(() => {
    data.list = [
      {
        "createdAt":"2000-12-22T11:58:31.835Z",
        "name":"Lorene Johnson",
        "avatar":"https://cdn.fakercloud.com/avatars/karthipanraj_128.jpg",
        "id":"1"
      }
    ]

    registerHelpers()
  })

  it('should register helpers', () => {
    expect(Handlebars.helpers.formatDate).toBeTruthy()
  })

  it('should return correct LocaleDate string', () => {
    const localeDate = Handlebars.helpers.formatDate?.(data.list[0].createdAt)
    expect(localeDate).toBe('12/22/2000')
  })

  it('should render cards correctly', () => {
    fillTemplate(data)
    const renderedElement = document.querySelector('#demo li')

    const name = renderedElement.querySelector('.card-name').innerText

    expect(name).toBe('Lorene Johnson')
  })

  it('should render more info on cards after clicking', () => {
    toggleShowMore('1')

    const renderedElement = document.querySelector('#demo li .details')

    expect(renderedElement.classList).toContain('show')
  })
})