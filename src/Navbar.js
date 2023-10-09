import React from 'react'; 
import { 
Nav, 
NavLink, 
Bars, 
NavMenu, 
NavBtn, 
NavBtnLink, 
} from './NavbarElements'; 

const Navbar = () => { 
return ( 
	<> 
	<Nav> 
		<Bars /> 

		<NavMenu> 
		<NavLink  activeStyle> 
			CRUD Assessment 
		</NavLink> 
		</NavMenu> 
		<NavBtn> 
		<NavBtnLink to='/signin'>Sign In</NavBtnLink> 
		</NavBtn> 
	</Nav> 
	</> 
); 
}; 

export default Navbar;
