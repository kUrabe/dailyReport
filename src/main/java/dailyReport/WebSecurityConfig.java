package dailyReport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import dailyReport.service.LoginUserDetailsService;

// @EnableWebSecurityを付与して、springSecurityのweb連携機能を有効にする
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	LoginUserDetailsService userDetailsService;

	// パスワードのencodeとしてBCryptを使用
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// ｊｓとcss以下へのアクセスは常に許可
		// トップ階層はindexページを出すので常に許可
		// それ以外のアクセスは認証必要
		// ログインフォームを認証に使う
		// 成功時は/roomsへ遷移する
		// 失敗時の遷移先を常にアクセス許可する
		http.authorizeRequests()
				.antMatchers("/js/**", "/css/**", "/img/**", "/")
				.permitAll()
				//.antMatchers("/**", "/**/**")
				.anyRequest()
				.authenticated()
				.and()
				.csrf()
				.disable()
				.formLogin()
				.loginPage("/loginForm")
				.loginProcessingUrl("/login")
				.usernameParameter("username")
				.passwordParameter("password")
				.defaultSuccessUrl("/Top", true)
				.failureUrl("/loginForm?error=true")
				.permitAll();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
}