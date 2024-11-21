import { TransactionGroupName } from "../types/Statements";

export const getIconFromCategory = (category: TransactionGroupName) => {
    switch (category) {
        case "living":
            return "mdi:home-outline";
        case "groceries":
            return "mdi:cart-outline";
        case "restaurants & cafe":
            return "mdi:restaurant";
        case "health & wellbeing":
            return "mdi:hospital-box-outline";
        case "home & garden":
            return "mdi:plant-outline";
        case "clothes & shoes":
            return "mdi:clothes-hanger";
        case "transport":
            return "mdi:car";
        case "charging":
            return "mdi:battery-charging-10";
        case "toll & parking":
            return "mdi:clothes-hanger";
        case "entertainment":
            return "mdi:movie-open-settings-outline";
        case "phone, tv & internet":
            return "mdi:cellphone";
        case "charity":
            return "mdi:heart";
        case "fixed":
            return "mdi:file-sign";
        case "income":
            return "mdi:cash";
        case "savings":
            return "mdi:piggy-bank-outline";
        case "other":
            return "mdi:file-question-outline";
        case "loan":
            return "mdi:bank";
        case "municipality costs":
            return "mdi:home-city-outline";
        case "vehicle":
            return "mdi:car";
    }
};