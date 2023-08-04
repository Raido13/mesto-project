import {closePopup} from './utils';

export const eventHandler = (e, popup) => {
    if(e.key === 'Escape') closePopup(popup);
    if(e.type === 'mousedown' && (!e.target.closest('.popup__container') && !e.target.closest('.popup__container_image'))) closePopup(popup);
}