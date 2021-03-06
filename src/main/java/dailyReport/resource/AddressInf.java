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
 * 住所i情報 モデルクラス.
 * 
 * @author generated by ERMaster
 * @version $Id$
 */
@Entity
@NamedQueries({
	@NamedQuery(
			name="searchUserAddress",
			query="SELECT a FROM AddressInf a WHERE a.user_id = :user_id"),
	@NamedQuery(
			name="deleteUserAddress",
			query="DELETE FROM AddressInf a WHERE a.user_id = :user_id")
})
@Table(name="address_inf")
public class AddressInf implements Serializable {

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

	/** 住所タイトル. */
	@Column(name="address_title")
	private String address_title;

	/** post数ber. */
	@Column(name="post_number")
	private String post_number;

	/** 住所. */
	@Column(name="address")
	private String address;

	/**
	 * コンストラクタ.
	 */
	public AddressInf() {
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
	 * 住所タイトル を設定します.
	 * 
	 * @param address_title
	 *            住所タイトル
	 */
	public void setAddressTitle(String address_title) {
		this.address_title = address_title;
	}

	/**
	 * 住所タイトル を取得します.
	 * 
	 * @return 住所タイトル
	 */
	public String getAddressTitle() {
		return this.address_title;
	}

	/**
	 * post数ber を設定します.
	 * 
	 * @param post_number
	 *            post数ber
	 */
	public void setPostNumber(String post_number) {
		this.post_number = post_number;
	}

	/**
	 * post数ber を取得します.
	 * 
	 * @return post数ber
	 */
	public String getPostNumber() {
		return this.post_number;
	}

	/**
	 * 住所 を設定します.
	 * 
	 * @param address
	 *            住所
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * 住所 を取得します.
	 * 
	 * @return 住所
	 */
	public String getAddress() {
		return this.address;
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
		AddressInf other = (AddressInf) obj;
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
