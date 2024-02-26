import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  mapToCanActivate,
  Router,
  RouterStateSnapshot,

} from '@angular/router';
import {constructor} from "express";
import {AuthenticationService} from "../services/authentication.service";


export const authenticationGuard: CanActivateFn = (route, state) => {

  constructor(private authService : AuthenticationService private router : Router){

  }



  let authenticated = this.authService.isAuthenticated();
  if(authenticated ==false){
this.router.navigateByUrl("/login");
return false;
  }else {
    return true;
  }

};
