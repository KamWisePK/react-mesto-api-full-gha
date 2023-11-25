import PopupWithForm from "./PopupWithForm.jsx";

function CardDeletePopup({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Удалить карточку?"
      buttonName="Удалить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default CardDeletePopup;
