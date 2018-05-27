import * as React from 'react';
import './Header.css';

interface UserProps{
    name: string,
    messages: number
};

const Logo: React.SFC = () => (
    <div className='logo'>
      <h2><a href='#' className='logo-link'>MedPortal</a></h2>
      <div className='logo-title'>Заботься о здоровье!</div>
    </div>
  );

const Account: React.SFC<UserProps> = (user) => (
    <div className='profile'>
        <div className='profile-name'>{user.name}</div>
        <div className='profile-msg'>
            <span className='profile-msg-text'>Личные сообщения: {user.messages}</span>
        </div>
  </div>
);

type Props = {}
type State = {
    user: {
        name: string,
        messages: number
    }
};
class Header extends React.Component<Props, State>{
    state:State = {
        user: {
            name: 'Ivan Ivanov',
            messages: 0
        }

    }
    
    render(){
        const user = this.state.user;
        return(
            <div>
                <div className='header'>
                    <Logo/>
                    <Account {...user}/>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Header;