import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  produto: 'Livro da casa do codigo',
  lanceInicial: 30,
  descricao: 'Livro bem bacana sobre Vue'
}

const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-03-05T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 1005,
    data: '2020-03-05T18:04:30.826Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 1099,
    data: '2020-03-05T18:04:31.826Z',
    leilao_id: 1
  }
]

describe('Leiloeiro inicia um leilao que nao possui lances', () => {
  test('avisa quando nao existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    const alert = wrapper.find('.alert').element
    expect(alert).toBeTruthy()
  })
})

describe('Um leiloeiro exibe os lances existentes', () => {
  test('nao mostra o aviso de "sem lances"', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alert = wrapper.find('.alert')
    expect(alert.exists()).toBe(false)
  })

  test('possui uma lista de lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const listaLances = wrapper.find('.list-inline')
    expect(listaLances.exists()).toBe(true)
  })
})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
  test('mostra o maior lance daquele leilao', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const maiorLance = wrapper.find('.maior-lance')
    const msgMaiorLance = `Maior lance: R$ ${lances[2].valor}`
    expect(maiorLance.element.textContent).toContain(msgMaiorLance)
  })

  test('mostra o menor lance daquele leilao', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const menorLance = wrapper.find('.menor-lance')
    const msgMenorLance = `Menor lance: R$ ${lances[0].valor}`
    expect(menorLance.element.textContent).toContain(msgMenorLance)
  })
})
