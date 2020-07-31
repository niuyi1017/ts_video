let styles = require('./popup.css')
// import './popup.css'

interface Ipopup {
  width? : string
  height?: string
  title?: string
  pos?: string
  mask?: boolean
  content?:() => void
}

interface Icomponent {
  tempContainer: HTMLElement
  init: () => void
  template: () => void
  handle: () => void
}

function popup(options: Ipopup) {
  return new Popup(options)
}

class Popup implements Icomponent {

  constructor(private settings : Ipopup) {
    this.settings = Object.assign({
      width: "100%",
      height: "100%",
      title: "",
      pos: "center",
      mask: true,
      content: function(){}
    }, this.settings)

    this.init()
  }

  tempContainer: HTMLElement
  mask : HTMLElement

  init() {
    this.template()
    this.mask && this.createMask()
  }
  template() {
    this.tempContainer = document.createElement('div')
    this.tempContainer.className = styles.popup
    this.tempContainer.style.width = this.settings.width
    this.tempContainer.style.height = this.settings.height
    this.tempContainer.innerHTML =
    `
      <div class="${styles['popup-title']}">
        <h3>${this.settings.title}</h3>
        <i class="iconfont iconclose"></i>
      </div>

      <div class="${styles['popup-content']}">
      </div>
    `
    document.body.appendChild(this.tempContainer)

    if (this.settings.pos == "left") {
      this.tempContainer.style.left = '0px'
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight)  + 'px'
    } else if (this.settings.pos == "right") {
      this.tempContainer.style.right = '0px'
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight)  + 'px'
    } else {
      this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth)/2  + 'px'
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight)/2  + 'px'
    }
  }
  handle() {
    
  }
  createMask() {
    console.log('createMask')
    this.mask = document.createElement('div')
    this.mask.className = styles.mask
    this.mask.style.height = document.body.offsetHeight + 'px'
    this.mask.style.width = '100%'
    document.body.appendChild(this.mask)

  }
}

export default popup