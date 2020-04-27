import {FuseUtils} from "../../../@fuse";
import UserHelper from "../../Helper/User";

class Uaa extends FuseUtils.EventEmitter{
    init()
    {
        // this.setInterceptors();
        this.handleAuthentication();
    }

    getUserLogin = () => {
        return UserHelper.getDataSession(UserHelper.LOCAL_STORAGE,'user')
    }

    handleAuthentication = () => {

        let access_token = UserHelper.getDataSession(UserHelper.LOCAL_STORAGE,'access_token')

        if ( !access_token )
        {
            this.emit('onNoAccessToken');
            return;
        }

        if ( UserHelper.isAuthTokenValid() )
        {
            UserHelper.setDataSession(UserHelper.LOCAL_STORAGE,'access_token',access_token)
            this.emit('onAutoLogin', true);
        }
        else
        {
            console.log('refresh token')
            UserHelper.refresh_token()
                .then(res => {
                    this.emit('onAutoLogin', true)
                })
                .catch(error => this.emit('onAutoLogout', error))
        }
    };
}
const UaaModel = new Uaa()
export default UaaModel