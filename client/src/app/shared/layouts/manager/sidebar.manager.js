import { role } from "../../../core/constants/config";
import { menu } from "../../../core/constants/menu";
import { AuthService } from "../../../core/services/auth.service"

function SidebarManager(){

    const userRole = AuthService.getRole() || role.MANAGER;

    return (
        <>
             <div className="sidebar">
                { menu.map((item, index) => (
                    item.allowedRoles.includes(userRole) && (
                        <div key={index} className="sidebar-item">
                            <a href={item.url}>
                            {item.iconUrl && <img src={item.iconUrl} alt={`${item.label} icon`} />}
                            <span>{item.label}</span>
                            </a>
                        </div>
                    )
                ))}
            </div>
        </>
    )
}

export default SidebarManager;