export default function InfoTooltip({ img, text, isOpen, onClose }) { 

    return ( 
      <div className={`popup ${isOpen ? "popup_opened" : ""} `}> 
        <div className="popup__container popup__container_regResult"> 
        <img className="popup__registration-img" src={img} alt="картинка с итогом регистрации"/>
        <p className="popup__registration-text" >{text}</p>
        <button className="popup__close-btn opacity" type="button" aria-label="Закрыть"
          title="Закрыть" onClick={onClose}></button>
        </div>
      </div> 
    ) 
  } 