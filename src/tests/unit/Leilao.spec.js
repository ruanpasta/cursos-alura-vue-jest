import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Um libro da casa do codigo',
  lanceInicial: 49,
  descricao: 'Um maravilhoso livro sobre VUE'
}

describe('Um leilao exibe os dados do produto', () => {
  test('exibe os dados do leilao no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    const textHeader = `Estamos leiloando um(a): ${leilao.produto}`
    const textTitle = `Lance inicial: R$ ${leilao.lanceInicial}`
    const textDescription = leilao.descricao

    expect(header.textContent).toContain(textHeader)
    expect(title.textContent).toContain(textTitle)
    expect(text.textContent).toContain(textDescription)
  })
})
