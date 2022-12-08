// let's check if the user clicked the mouse
const imagesContainer = document.querySelector(".images-container")

window.onmousedown = event => {
  imagesContainer.dataset.mouseDownAt = event.clientX
}

window.onmousemove = event => {
  if (imagesContainer.dataset.mouseDownAt == "0") return 0
  const Xdelta = parseFloat(imagesContainer.dataset.mouseDownAt) - event.clientX
  const Xmax = window.innerWidth / 2
  const percentage = (Xdelta / Xmax) * -100
  let nextpercentage = +imagesContainer.dataset.prePercent + percentage
  if (nextpercentage <= -100) nextpercentage = -100
  if (nextpercentage >= 0) nextpercentage = 0

  imagesContainer.dataset.percent = nextpercentage

  document.documentElement.style.setProperty( "--bc-img-pos", `${-nextpercentage/15}%` );
  imagesContainer.animate({
    transform: `translate(${nextpercentage}%, -50%)`
  },
  {
    duration: 1200, fill: "forwards"
  }
  )

  document.querySelectorAll("img").forEach(img => {
    img.animate({
      objectPosition: `${nextpercentage + 100}% 50%`
    },
    {
      duration: 1200, fill: "forwards"
    }
    )
  })

}

window.onmouseup = event => {
  imagesContainer.dataset.mouseDownAt = "0"
  imagesContainer.dataset.prePercent = imagesContainer.dataset.percent
}