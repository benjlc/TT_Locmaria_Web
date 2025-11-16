// --- Calcul du total ---
const saucissonsInput = document.getElementById('saucissons');
const bieresInput = document.getElementById('bieres');
const totalSpan = document.getElementById('total');

function updateTotal() {
  const saucissons = parseInt(saucissonsInput.value) || 0;
  const bieres = parseInt(bieresInput.value) || 0;
  const total = saucissons * 5 + bieres * 3;
  totalSpan.textContent = `${total} €`;
}

saucissonsInput.addEventListener('input', updateTotal);
bieresInput.addEventListener('input', updateTotal);

// --- Génération du PDF ---
document.getElementById('generatePDF').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const tel = document.getElementById('tel').value;
  const saucissons = document.getElementById('saucissons').value;
  const bieres = document.getElementById('bieres').value;
  const total = totalSpan.textContent;

  doc.setFontSize(16);
  doc.text("Bon de commande TT LOC", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nom : ${nom}`, 20, 40);
  doc.text(`Prénom : ${prenom}`, 20, 50);
  doc.text(`Téléphone : ${tel}`, 20, 60);
  doc.text(`Saucissons : ${saucissons} x 5 €`, 20, 80);
  doc.text(`Bières : ${bieres} x 3 €`, 20, 90);
  doc.text(`-----------------------------------`, 20, 100);
  doc.text(`TOTAL : ${total}`, 20, 110);

  doc.save(`Bon_commande_${nom || 'TTLOC'}.pdf`);
});
