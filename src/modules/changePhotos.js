const changePhotos = () => {
  const teamBlock = document.getElementById('command'),
  updateLogo = (event) => {
    let target = event.target,
    oldLogo;

    if (target.matches('.command__photo')) {
      oldLogo = target.src;
      target.src = target.dataset.img;
      target.dataset.img = oldLogo;
    }
  };

  teamBlock.addEventListener('mouseover', (event) => {
    updateLogo(event);  
  });

  teamBlock.addEventListener('mouseout', (event) => {
    updateLogo(event);  
  });
};

export default changePhotos;