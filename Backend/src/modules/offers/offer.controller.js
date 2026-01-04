import { assignOfferToUser, createOffer, deleteassignOfferToUser, deleteOffer, getassignOfferToUser, getOffers, updateassignOfferToUser, updateOffer } from "./offer.service.js";



export const CreateOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const createdOffer = await createOffer(offer);
        res.status(201).json(createdOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


export const GetOfferscontroller = async (req, res) => {
    try{
        const offers = await getOffers();
        res.status(200).json(offers);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const UpdateOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const updatedOffer = await updateOffer(offer.id, offer);
        res.status(200).json(updatedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const DeleteOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const deletedOffer = await deleteOffer(offer.id);
        res.status(200).json(deletedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


export const AssignOfferToUserController = async (req, res) => {
    try{
        const offer = req.body  ;
        const assignedOffer = await assignOfferToUser(offer.id, offer.user_id);
        res.status(200).json(assignedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


export const GetAssignedOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const assignedOffer = await getassignOfferToUser(offer.id);
        res.status(200).json(assignedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const DeleteAssignedOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const deletedOffer = await deleteassignOfferToUser(offer.id);
        res.status(200).json(deletedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const UpdateAssignedOfferscontroller = async (req, res) => {
    try{
        const offer = req.body  ;
        const updatedOffer = await updateassignOfferToUser(offer.id, offer.user_id);
        res.status(200).json(updatedOffer);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
