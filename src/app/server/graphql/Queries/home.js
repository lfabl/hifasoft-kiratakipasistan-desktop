import {
    gql 
} from "apollo-boost";

export const home = gql`
        query {
            home{
                message,
                code,
                approaching {
                    id,
                    title,
                    contract {
                        id,
                        rentalDate,
                        contractPeriod
                    }
                },
                pastEstateData {
                    id,
                    title,
                    contract {
                        id,
                        rentalDate,
                        contractPeriod
                    }
                },
                totalEstatesCount,
                totalActiveEstateCount,
                totalPassiveEstateCount,
                totalTenantCount
            }
        }  
`;