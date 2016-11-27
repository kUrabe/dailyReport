package dailyReport.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import dailyReport.resource.UserInf;


public class LoginUserDetails implements UserDetails {
	// mrs.domain.model.Userの内包する。基本的なユーザ情報はこのフィールドを持つ
	private final UserInf user;

	public LoginUserDetails(UserInf user) {
		this.user = user;
	}

	public UserInf getUser() {
		return user;
	}

	@Override
	public String getPassword() {
		return this.user.getLoginPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getUserId();
	}

	// アカウント期限切れの無効化
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// アカウントロックの無効化
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// パスワード有効期限切れの無効化
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	// アカウント無効化の無効化
	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}
}