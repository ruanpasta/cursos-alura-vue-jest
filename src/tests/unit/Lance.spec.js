import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor minimo', () => {
  test('nao aceita lance com valor menor do que zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(-1)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('emite um lance quando o valor eh maior do que zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(1)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite o valor esperado de um lance valido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(10)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(10)
  })
})

describe('um lance com valor minimo', () => {
  test('todos os lances devem possuir um valor maior do que o minimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 100
      }
    })
    const input = wrapper.find('input')
    input.setValue(200)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite um valor esperado de um lance valido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 100
      }
    })
    const input = wrapper.find('input')
    input.setValue(300)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(300)
  })

  test('nao sao aceitos lances com valores menor do que o minimo informado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 100
      }
    })
    const input = wrapper.find('input')
    input.setValue(20)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 100'
    expect(msgErro).toContain(msgEsperada)
  })
})
