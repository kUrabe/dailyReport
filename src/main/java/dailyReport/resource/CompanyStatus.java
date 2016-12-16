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
 * 会社status モデルクラス.
 * 
 * @author generated by ERMaster
 * @version $Id$
 */
@Entity
@NamedQueries({
	@NamedQuery(
			name="searchUserCompanyStatus",
			query="SELECT c FROM CompanyStatus c WHERE c.user_id = :user_id")
})
@Table(name="company_status")
public class CompanyStatus implements Serializable {

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

	/** campany_id. */
	@Column(name="campany_id")
	private Integer campany_id;

	/** 部署id. */
	@Column(name="department_id")
	private Integer department_id;

	/** position_id. */
	@Column(name="position_id")
	private Integer position_id;

	/**
	 * コンストラクタ.
	 */
	public CompanyStatus() {
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
	 * campany_id を設定します.
	 * 
	 * @param campany_id
	 *            campany_id
	 */
	public void setCampanyId(Integer campany_id) {
		this.campany_id = campany_id;
	}

	/**
	 * campany_id を取得します.
	 * 
	 * @return campany_id
	 */
	public Integer getCampanyId() {
		return this.campany_id;
	}

	/**
	 * 部署id を設定します.
	 * 
	 * @param department_id
	 *            部署id
	 */
	public void setDepartmentId(Integer department_id) {
		this.department_id = department_id;
	}

	/**
	 * 部署id を取得します.
	 * 
	 * @return 部署id
	 */
	public Integer getDepartmentId() {
		return this.department_id;
	}

	/**
	 * position_id を設定します.
	 * 
	 * @param position_id
	 *            position_id
	 */
	public void setPositionId(Integer position_id) {
		this.position_id = position_id;
	}

	/**
	 * position_id を取得します.
	 * 
	 * @return position_id
	 */
	public Integer getPositionId() {
		return this.position_id;
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
		CompanyStatus other = (CompanyStatus) obj;
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