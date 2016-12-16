package dailyReport.resource;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * mail_i情報 モデルクラス.
 * 
 * @author generated by ERMaster
 * @version $Id$
 */
@Entity
@NamedQueries({
	@NamedQuery(
			name="searchUserMail",
			query="SELECT m FROM MailInf m WHERE m.user_id = :user_id")
})
@Table(name="mail_inf")
public class MailInf implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** id. */
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	/** ユーザid. */
	@Column(name="user_id")
	private String user_id;

	/** mailタイトル. */
	@Column(name="mail_title")
	private String mail_title;

	/** mail. */
	@Column(name="mail")
	private String mail;

	/**
	 * コンストラクタ.
	 */
	public MailInf() {
	}

	/**
	 * id を設定します.
	 * 
	 * @param id
	 *            id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * id を取得します.
	 * 
	 * @return id
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * ユーザid を設定します.
	 * 
	 * @param user_id
	 *            ユーザid
	 */
	public void setUserId(String user_id) {
		this.user_id = user_id;
	}

	/**
	 * ユーザid を取得します.
	 * 
	 * @return ユーザid
	 */
	public String getUserId() {
		return this.user_id;
	}

	/**
	 * mailタイトル を設定します.
	 * 
	 * @param mail_title
	 *            mailタイトル
	 */
	public void setMailTitle(String mail_title) {
		this.mail_title = mail_title;
	}

	/**
	 * mailタイトル を取得します.
	 * 
	 * @return mailタイトル
	 */
	public String getMailTitle() {
		return this.mail_title;
	}

	/**
	 * mail を設定します.
	 * 
	 * @param mail
	 *            mail
	 */
	public void setMail(String mail) {
		this.mail = mail;
	}

	/**
	 * mail を取得します.
	 * 
	 * @return mail
	 */
	public String getMail() {
		return this.mail;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		MailInf other = (MailInf) obj;
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}

}
