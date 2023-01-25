// iniciarJuego //
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionBotonReiniciar = document.getElementById('boton-reiniciar')
const botonSeleccionar = document.getElementById('boton-seleccionar')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionBotonReiniciar.style.display = 'none'
// seleccionarMascota //
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
// seleccionarMascotaEnemigo //
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
// combate //
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
// crearMensaje //
const sectionMensajes =  document.getElementById('resultado')
const ataquesDelJugador =  document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo =  document.getElementById('ataques-del-enemigo')
// Imprimir tarjetas en la primera pantalla de las mascotas - Label //
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
// Canvas //
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaximoDelMapa = 520

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let mascotaJugadorObjeto 
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBrackground = new Image() 
mapaBrackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 70
        this.alto = 70
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/Hipodoge.png', 5, './assets/Face-hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/Capipepo.png', 5, '.assets/Face-capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/Ratigueya.png', 5, './assets/Face-ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', './assets/Langostelvis.png', 5, './assets/Face-langostelvis.png')
let tucapalma = new Mokepon('Tucapalma', './assets/Tucapalma.png', 5, './Face-tucapalma.png')
let pydos = new Mokepon('Pydos', './assets/Pydos.png', 5, './assets/Face-pydos.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
    {nombre: '🌵', id: 'boton-tierra'},
    {nombre: '🌵', id: 'boton-tierra'},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
]
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
    {nombre: '🌵', id: 'boton-tierra'},
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌵', id: 'boton-tierra'},
    {nombre: '🌵', id: 'boton-tierra'},
]
pydos.ataques.push(...PYDOS_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucapalma = document.getElementById('Tucapalma')
        inputPydos = document.getElementById('Pydos')
    })
    botonSeleccionar.addEventListener('click',seleccionarMascota)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionarMascota() {           
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if  (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if  (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if  (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if  (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else {
        alert("Por favor, selecciona una mascota")
        return
    }
    
    sectionSeleccionarMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#FF4500'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#1E90FF'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#8B4513'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
    }

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`, {
        method: "post",
        headers: { 
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function (ataques) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatoria = aleatorio(0,mokepones.length -1) 
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {

    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    if (ataqueAleatorio ==0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio ==3 || ataqueAleatorio ==4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length ===5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje(" EMPATE ") 
        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje("¡¡🎉GANASTE🎉!!")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index, index)
            crearMensaje("¡¡🎉GANASTE🎉!!")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index, index)
            crearMensaje("¡¡🎉GANASTE🎉!!")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("¡PERDISTE!")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("¡¡¡Fue empate!")
    } else if (victoriasJugador > victoriasEnemigo) { 
        crearMensajeFinal("🎊 ¡Ganaste! 🎊")
    } else {
        crearMensajeFinal("¡Perdiste!💔")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionBotonReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
	return Math.floor(Math.random() * ( max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBrackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach (function (mokepon) {
        if(mokepon != undefined) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })

}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
                .then(function ({enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo)
                {
                    let mokeponEnemigo = null
                    if(enemigo.mokepon != undefined)
                    {
                    const mokeponNombre = enemigo.mokepon.nombre 
                    switch (mokeponNombre) {
                        case "Hipodoge":
                            mokeponEnemigo = new Mokepon('Hipodoge', './Hipodoge.png', 5, './Face-hipodoge.png', enemigo.id)
                                break
                        case "Capipepo":
                            mokeponEnemigo = new Mokepon('Capipepo', './Capipepo.png', 5, './Face-capipepo.png', enemigo.id)
                                break
                        case "Ratigueya": 
                            mokeponEnemigo = new Mokepon('Ratigueya', './Ratigueya.png', 5, './Face-ratigueya.png', enemigo.id)
                                break
                        case "Langostelvis" :
                            mokeponEnemigo = new Mokepon('Langostelvis', './Langostelvis.png', 5, './Face-langostelvis.png', enemigo.id)
                                break
                        case "Tucapalma":
                            mokeponEnemigo = new Mokepon('Tucapalma', './Tucapalma.png', 5, './Face-tucapalma.png', enemigo.id)
                                break
                        case "Pydos":
                            mokeponEnemigo = new Mokepon('Pydos', './Pydos.png', 5, './Face-pydos.png', enemigo.id)
                                break
                        default:
                            break
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                    }
                    return mokeponEnemigo
                    })
                    
                    
                    // mokeponesEnemigos = enemigos.map(function (enemigo) {
                    //     let mokeponEnemigo = null
                    //     const mokeponNombre = enemigo.mokepon.nombre || []
                    //     if (mokeponNombre === "Hipodoge") {
                    //         mokeponEnemigo = new Mokepon('Hipodoge', './Hipodoge.png', 5, './Face-hipodoge.png', enemigo.id)
                    //     } else if (mokeponNombre === "Capipepo") {
                    //         mokeponEnemigo = new Mokepon('Capipepo', './Capipepo.png', 5, './Face-capipepo.png', enemigo.id)
                    //     } else if (mokeponNombre === "Ratigueya") {
                    //         mokeponEnemigo = new Mokepon('Ratigueya', './Ratigueya.png', 5, './Face-ratigueya.png', enemigo.id)
                    //     } else if (mokeponNombre === "Langostelvis") {
                    //         mokeponEnemigo = new Mokepon('Langostelvis', './Langostelvis.png', 5, './Face-langostelvis.png', enemigo.id)
                    //     } else if (mokeponNombre === "Tucapalma") {
                    //         mokeponEnemigo = new Mokepon('Tucapalma', './Tucapalma.png', 5, './Face-tucapalma.png', enemigo.id)
                    //     } else if (mokeponNombre === "Pydos") {
                    //         mokeponEnemigo = new Mokepon('Pydos', './Pydos.png', 5, './Face-pydos.png', enemigo.id)
                    //     }                                      
                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break 
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return; 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detectó una colisión');
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'block'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
