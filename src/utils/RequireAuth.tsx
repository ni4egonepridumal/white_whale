import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { JWT_token } from "../services/auth/auth.service";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { token } = useAppSelector(state => state.authorization)

    if (!JWT_token) {
        return <Navigate to={'/authorization'} replace />
    }
    return children
}