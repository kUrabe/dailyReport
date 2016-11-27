package dailyReport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dailyReport.resource.UserInf;

@Service
public class LoginUserDetailsService implements UserDetailsService {
	@Autowired
	CommonService commonService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// ユーザ取得処理はUserRepositoryに委譲する
		UserInf user = commonService.userAuth(username);
		if (user == null) {
			throw new UsernameNotFoundException(username + " is not found.");
		}
		return new LoginUserDetails(user);
	}
	
}
