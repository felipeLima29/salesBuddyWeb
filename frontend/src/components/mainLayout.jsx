import Menu from "./menu";
import { Outlet } from "react-router-dom";

export default function MainLayout(){
    return(
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            
            {/* 1. O Menu fica fixo na esquerda */}
            <Menu />

            {/* 2. O Outlet é onde as páginas (Filhos) vão aparecer */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <Outlet />
            </div>

        </div>
    )
}