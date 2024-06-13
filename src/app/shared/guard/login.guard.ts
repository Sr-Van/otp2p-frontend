import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { CanActivateFn, Router } from "@angular/router";


export const LoginGuard : CanActivateFn = (route, state) => {

    const loginServ = inject(LoginService)
    const router = inject(Router)

    if(!loginServ.userIsLoggedIn()) {
        return true
    }

    router.navigate([``])

    return false
}