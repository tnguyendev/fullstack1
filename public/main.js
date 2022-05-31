document.querySelector("#addBtn").addEventListener('click',()=>{
  let container = document.createElement('div')
  let notes = document.createElement('textarea')
  let parent = document.querySelector('.notepadList')

  console.log(parent.childNodes.length - 2)
  notes.name = parent.childNodes.length - 2
  notes.cols = "30"
  notes.rows = '10'

  container.classList.add('notes')
  container.appendChild(notes)
  parent.appendChild(container)
})

document.querySelectorAll(".closeBtn").forEach(e => e.addEventListener('click',(event)=>{
  event.target.parentNode.parentNode.remove()
})
)

