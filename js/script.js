const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.clickable-affiche').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

function calculPrixSaucissons(qte) {
  let total = 0;
  while (qte > 0) {
    if (qte >= 3) { total += 11; qte -= 3; }
    else { total += 4 * qte; qte = 0; }
  }
  return total;
}

function calculPrixBieres(qte) {
  let total = 0;
  while (qte > 0) {
    if (qte >= 4) { total += 15; qte -= 4; }
    else if (qte >= 3) { total += 11; qte -= 3; }
    else { total += 4 * qte; qte = 0; }
  }
  return total;
}

function updateTotal() {
  const s = parseInt(document.getElementById('total-saucisson').value) || 0;
  const b = parseInt(document.getElementById('total-biere').value) || 0;
  const total = calculPrixSaucissons(s) + calculPrixBieres(b);
  document.getElementById('total-general').textContent = total + " €";
}

document.getElementById('total-saucisson').addEventListener('input', updateTotal);
document.getElementById('total-biere').addEventListener('input', updateTotal);

document.getElementById('download').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nom = document.getElementById('nom').value;
  const tel = document.getElementById('tel').value;
  const total = document.getElementById('total-general').textContent;

  doc.text("Bon de commande TT LOC", 20, 20);
  doc.text("Nom : " + nom, 20, 40);
  doc.text("Téléphone : " + tel, 20, 50);
  doc.text("Total : " + total, 20, 60);

  doc.save("bon_commande_ttloc.pdf");
});