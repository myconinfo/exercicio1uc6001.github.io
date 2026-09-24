const backdrop = document.querySelector('[data-modal-backdrop]');
const modalTitle = document.querySelector('#modal-title');
const modalCopy = document.querySelector('.modal-copy');
const emailInput = document.querySelector('#email');
const openButtons = document.querySelectorAll('[data-modal]');
const closeButton = document.querySelector('[data-close-modal]');
const authForm = document.querySelector('#auth-form');

function openModal(mode) {
  const isLogin = mode === 'login';
  modalTitle.textContent = isLogin ? 'Bem-vindo de volta.' : 'Comece pelo primeiro passo.';
  modalCopy.textContent = isLogin ? 'Acesse sua conta e continue cuidando do seu futuro.' : 'Crie sua conta grátis e dê mais clareza para o seu dinheiro.';
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => emailInput.focus(), 50);
}

function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

openButtons.forEach((button) => button.addEventListener('click', () => openModal(button.dataset.modal)));
closeButton.addEventListener('click', closeModal);
backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !backdrop.hidden) closeModal();
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = authForm.querySelector('button');
  submitButton.innerHTML = 'Tudo certo! <span aria-hidden="true">✓</span>';
  submitButton.disabled = true;
  window.setTimeout(() => {
    closeModal();
    submitButton.innerHTML = 'Continuar <span aria-hidden="true">↗</span>';
    submitButton.disabled = false;
    authForm.reset();
  }, 1100);
});

document.querySelector('[data-toggle-balance]').addEventListener('click', (event) => {
  const balances = document.querySelectorAll('[data-money-value]');
  const currentlyHidden = Array.from(balances).some((item) => item.textContent.includes('•'));

  balances.forEach((item) => {
    item.textContent = currentlyHidden ? item.dataset.moneyValue : '••••••';
  });

  event.currentTarget.setAttribute('aria-label', currentlyHidden ? 'Ocultar saldos' : 'Mostrar saldos');
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('.main-nav').style.display = expanded ? '' : 'flex';
  document.querySelector('.main-nav').style.position = 'absolute';
  document.querySelector('.main-nav').style.top = '75px';
  document.querySelector('.main-nav').style.left = '0';
  document.querySelector('.main-nav').style.right = '0';
  document.querySelector('.main-nav').style.background = '#f5f3ec';
  document.querySelector('.main-nav').style.padding = '20px';
  document.querySelector('.main-nav').style.margin = '0';
  document.querySelector('.main-nav').style.flexDirection = 'column';
});
