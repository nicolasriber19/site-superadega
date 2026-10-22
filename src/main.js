// Página principal: importa os estilos e liga cada seção, na ordem do index.html.
// Cada arquivo de src/sections/ cuida de uma <section id="..."> e exporta init().

import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/animacao.css'

import { init as initTopo } from './sections/topo.js'
import { init as initCapa } from './sections/capa.js'
import { init as initQuemSomos } from './sections/quem-somos.js'
import { init as initComoFunciona } from './sections/como-funciona.js'
import { init as initOQueVoceRecebe } from './sections/o-que-voce-recebe.js'
import { init as initProdutos } from './sections/produtos.js'
import { init as initFinalizar } from './sections/finalizar.js'
import { init as initRodape } from './sections/rodape.js'
import { ligarOuvir } from './lib/ouvir.js'

initTopo()
initCapa()
initQuemSomos()
initComoFunciona()
initOQueVoceRecebe()
initProdutos()
initFinalizar()
initRodape()

// Por último: os botões "Ouvir" dos cards só existem depois que os produtos são montados.
ligarOuvir()
