/* Imports Queries */
import { getProfile } from "./Queries/getProfile";

import { getAllRealEstates } from "./Queries/getAllRealEstates";
import { getRealEstate } from "./Queries/getRealEstate";

import { getAllTenants } from "./Queries/getAllTenants";
import { getTenant } from "./Queries/getTenant";

import { getAvailableRealEstatesForContract } from "./Queries/getAvailableRealEstatesForContract";
import { getAvailableTenantsForContract } from "./Queries/getAvailableTenantsForContract";
import { contractControl } from "./Queries/contractControl";

import { home } from "./Queries/home";

/* Import Mutations */
import { updateProfile } from "./Mutation/updateProfile";
import { updateProfileImage } from "./Mutation/updateProfileImage";

import { newRealEstate } from "./Mutation/newRealEstate";
import { updateRealEstate } from "./Mutation/updateRealEstate";
import { deleteRealEstate } from "./Mutation/deleteRealEstate";

import { newTenant } from "./Mutation/newTenant";
import { updateTenant } from "./Mutation/updateTenant";
import { updateTenantImage } from "./Mutation/updateTenantImage";
import { deleteTenant } from "./Mutation/deleteTenant";

import { newContract } from "./Mutation/newContract";
import { deleteContract } from "./Mutation/deleteContract";

/* Exports */

export {
    /* Queries */
    getProfile,
    getAllRealEstates,
    getRealEstate,
    getAllTenants,
    getTenant,
    getAvailableRealEstatesForContract,
    getAvailableTenantsForContract,
    contractControl,
    home,

    /* Impot Mutations */
    updateProfile,
    updateProfileImage,
    newRealEstate,
    updateRealEstate,
    deleteRealEstate,
    newTenant,
    updateTenant,
    updateTenantImage,
    deleteTenant,
    newContract,
    deleteContract
}
