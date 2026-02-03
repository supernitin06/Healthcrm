import { ApplyClaimService, getClaim, getClaimById, ApproveClaimService } from "./claim.service.js";

export const ApplyClaimController = async (req, res) => {
   try {
      const { user_id, insurance_id, claim_amount, reason } = req.body;
      const documents_upload = req.file ? req.file.path : null;

      if (!user_id || !insurance_id || !claim_amount) {
         return res.status(400).json({ error: "user_id, insurance_id and claim_amount are required" });
      }

      const result = await ApplyClaimService({
         user_id,
         insurance_id,
         claim_amount,
         documents_upload,
         reason,
         status: 'pending'
      });

      res.status(201).json({
         success: true,
         message: "Claim applied successfully",
         data: result
      });
   } catch (error) {
      console.error("❌ Error applying claim:", error);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message
      });
   }
}

export const GetClaimController = async (req, res) => {
   try {
      const result = await getClaim();
      res.status(200).json({
         success: true,
         message: "Claims fetched successfully",
         data: result
      });
   } catch (error) {
      console.error("❌ Error fetching claims:", error);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message
      });
   }
}

export const GetClaimByIdController = async (req, res) => {
   try {
      const { id } = req.params;
      const result = await getClaimById({ id });

      if (!result) {
         return res.status(404).json({
            success: false,
            message: "Claim not found"
         });
      }

      res.status(200).json({
         success: true,
         message: "Claim fetched successfully",
         data: result
      });
   } catch (error) {
      console.error("❌ Error fetching claim:", error);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message
      });
   }
}

export const ApproveClaimController = async (req, res) => {
   try {
      const { id } = req.params;
      const { status, approved_amount } = req.body;
      const approved_by = req.user?.id;

      if (!status || !approved_amount) {
         return res.status(400).json({
            success: false,
            message: "status and approved_amount are required"
         });
      }

      const result = await ApproveClaimService({
         id,
         status,
         approved_amount,
         approved_by,
         approved_at: new Date()
      });

      res.status(200).json({
         success: true,
         message: "Claim approved successfully",
         data: result
      });
   } catch (error) {
      console.error("❌ Error approving claim:", error);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message
      });
   }
}