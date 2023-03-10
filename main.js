const cepRef = document.querySelector('#cep')
const eNumero = (numero) => /^[0-9]+$/.test(numero)
const cepValido = (cep) => cep.length === 8 && eNumero(cep)

const buscarCep = async () => {
  limparFormulario()

  const cepBuscado = cepRef.value
  const url = ` https://viacep.com.br/ws/${cepBuscado}/json/`
  if (cepValido(cepBuscado)) {
    const response = await fetch(url);
    const endereco = await response.json()
    if (endereco.hasOwnProperty('erro')) {
      document.querySelector('#endereco').value = "CEP não encontrado"
    } else {
      preencherCampo(endereco)
    }
  } else {
    document.querySelector('#endereco').value = "CEP inválido"

  }
}


function preencherCampo(endereco) {
  limparFormulario()
  document.querySelector('#endereco').value = endereco.logradouro
  document.querySelector('#bairro').value = endereco.bairro
  document.querySelector('#cidade').value = endereco.localidade
  document.querySelector('#estado').value = endereco.uf
}
function limparFormulario() {

  document.querySelector('#endereco').value = ''
  document.querySelector('#bairro').value = ''
  document.querySelector('#cidade').value = ''
  document.querySelector('#estado').value = ''
}


cepRef.addEventListener('focusout', buscarCep)
