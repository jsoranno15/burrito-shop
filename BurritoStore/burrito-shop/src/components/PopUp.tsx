import { useState } from 'react';
import { useShoppingCart } from "../context/ShoppingCartContext"
 
interface PopupProps {
    itemID: number;
  }
  
export function PopUp({itemID}:PopupProps){
const [showPopup, setShowPopup] = useState(false);
const [options, setOptions] = useState<string[]>(['Cheese', 'Lettuce', 'Tomato']);
const [checkedOptions, setCheckedOptions] = useState<boolean[]>(
    new Array(options.length).fill(false)
);

const handleCheckboxChange = (index: number) => {
    setCheckedOptions((prevOptions) => {
    const newOptions = [...prevOptions];
    newOptions[index] = !prevOptions[index];
    return newOptions;
    });
};

const getCheckedOptions = () => {
    const condiments = options.filter((option, index) => checkedOptions[index]);
  };

const handleOpenPopup = () => {
    setShowPopup(true);
};

const handleClosePopup = () => {
    setShowPopup(false);
};

const handleConfirm = (itemID: number) => {
    increaseCartQuantity(itemID);
    handleClosePopup();
};

const{ 
    getItemQuantity, 
    increaseCartQuantity, 
    //decreaseCartQuantity, 
} = useShoppingCart()
const quantity = getItemQuantity(itemID)

return (
    <div>
    <button onClick={handleOpenPopup} className="order-button">Add to Order</button>
    {showPopup && (
        <div className="popup">
        <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
            &times;
            </span>
            <p>Item Add-Ons</p>
            {options.map((option, index) => (
            <label key={option}>
                <input
                type="checkbox"
                checked={checkedOptions[index]}
                onChange={() => handleCheckboxChange(index)}
                />
                {option}
            </label>
            ))}
            <button onClick={()=> handleConfirm(itemID)}>Confirm</button>
        </div>
        </div>
    )}
    </div>
);
};

