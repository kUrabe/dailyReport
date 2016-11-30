package dailyReport.resource;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import dailyReport.service.TopSearchContentSummary;

// TopSearchContent Top画面検索実行時
// "SELECT i FROM record_content_inf i LEFT JOIN FETCH record_content_add a ON i.content_id = a.content_id WHERE i.user_id like :serach_user AND i.entry_status IN(:serach_note) AND i.report_date BETWEEN :serach_from_date AND :serach_to_date AND a.category_status IN(:serach_read)"

// ↓ 下書と既読の条件指定を外している、かつ集計していないJPQL（実行可）
// "SELECT i FROM RecordContentInf i LEFT JOIN FETCH i.recordContentAddSet WHERE i.userInf.userName like :serach_user AND i.reportDate BETWEEN :serach_from_date AND :serach_to_date"

@Entity
@NamedQueries({
	@NamedQuery(name="TopSearchContentQuery", 
			query="SELECT DISTINCT i FROM RecordContentInf i LEFT JOIN FETCH i.recordContentAddSet WHERE i.userInf.user_id like :serach_user AND i.report_date BETWEEN :serach_from_date AND :serach_to_date AND i.entry_format = 2")
})
@Table(name="record_content_inf")
@SqlResultSetMappings({
	@SqlResultSetMapping(
			name="summary", 
			classes = @ConstructorResult(
					targetClass = TopSearchContentSummary.class, 
					columns = {
							@ColumnResult(name = "report_date"),
							@ColumnResult(name = "content_id"),
							@ColumnResult(name = "user_id"),
							@ColumnResult(name = "user_name"),
							@ColumnResult(name = "entry_format"),
							@ColumnResult(name = "entry_status"),
							@ColumnResult(name = "base_parent_content_id"),
							@ColumnResult(name = "grand_parent_content_id"),
							@ColumnResult(name = "parent_content_id")
							//@ColumnResult(name = "read_count")
							//@ColumnResult(name = "read_status"),
							//@ColumnResult(name = "comment_count"),
							//@ColumnResult(name = "favorite_count")
					}
			)
	)
})
public class RecordContentInf implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** コンテンツID. */
	@Id
	@Column(name="content_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer content_id;

	/** ユーザ情報. */
	@ManyToOne
	@JoinColumn(name="user_id", insertable=false, updatable=false)
	private UserInf userInf;

	/** 登録書式. */
	@Column(name="entry_format")
	private Integer entry_format;

	/** 登録状態. */
	@Column(name="entry_status")
	private Integer entry_status;

	/** 基底親コンテンツID. */
	@Column(name="base_parent_content_id")
	private Integer base_parent_content_id;

	/** 祖先コンテンツID. */
	@Column(name="grand_parent_content_id")
	private Integer grand_parent_content_id;

	/** 親コンテンツID. */
	@Column(name="parent_content_id")
	private Integer parent_content_id;

	/** 報告日. */
	@Column(name="report_date")
	private Date report_date;

	/** 作成日. */
	@Column(name="create_date")
	private Date create_date;

	/** 更新日. */
	@Column(name="update_dated")
	private Date update_dated;

	/** コンテンツ追加情報 一覧. */
	@OneToMany
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private Set<RecordContentAdd> recordContentAddSet;

	/** コンテンツ詳細 一覧. */
	@OneToMany
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private Set<RecordContentDetail> recordContentDetailSet;

	/**
	 * コンストラクタ.
	 */
	public RecordContentInf() {
		this.recordContentAddSet = new HashSet<RecordContentAdd>();
		this.recordContentDetailSet = new HashSet<RecordContentDetail>();
	}

	/**
	 * コンテンツID を設定します.
	 * 
	 * @param contentId
	 *            コンテンツID
	 */
	public void setContentId(Integer contentId) {
		this.content_id = contentId;
	}

	/**
	 * コンテンツID を取得します.
	 * 
	 * @return コンテンツID
	 */
	public Integer getContentId() {
		return this.content_id;
	}

	/**
	 * ユーザ情報 を設定します.
	 * 
	 * @param userInf
	 *            ユーザ情報
	 */
	public void setUserInf(UserInf userInf) {
		this.userInf = userInf;
	}

	/**
	 * ユーザ情報 を取得します.
	 * 
	 * @return ユーザ情報
	 */
	public UserInf getUserInf() {
		return this.userInf;
	}

	/**
	 * 登録書式 を設定します.
	 * 
	 * @param entryFormat
	 *            登録書式
	 */
	public void setEntryFormat(Integer entryFormat) {
		this.entry_format = entryFormat;
	}

	/**
	 * 登録書式 を取得します.
	 * 
	 * @return 登録書式
	 */
	public Integer getEntryFormat() {
		return this.entry_format;
	}

	/**
	 * 登録状態 を設定します.
	 * 
	 * @param entryStatus
	 *            登録状態
	 */
	public void setEntryStatus(Integer entryStatus) {
		this.entry_status = entryStatus;
	}

	/**
	 * 登録状態 を取得します.
	 * 
	 * @return 登録状態
	 */
	public Integer getEntryStatus() {
		return this.entry_status;
	}

	/**
	 * 基底親コンテンツID を設定します.
	 * 
	 * @param baseParentContentId
	 *            基底親コンテンツID
	 */
	public void setBaseParentContentId(Integer baseParentContentId) {
		this.base_parent_content_id = baseParentContentId;
	}

	/**
	 * 基底親コンテンツID を取得します.
	 * 
	 * @return 基底親コンテンツID
	 */
	public Integer getBaseParentContentId() {
		return this.base_parent_content_id;
	}

	/**
	 * 祖先コンテンツID を設定します.
	 * 
	 * @param grandParentContentId
	 *            祖先コンテンツID
	 */
	public void setGrandParentContentId(Integer grandParentContentId) {
		this.grand_parent_content_id = grandParentContentId;
	}

	/**
	 * 祖先コンテンツID を取得します.
	 * 
	 * @return 祖先コンテンツID
	 */
	public Integer getGrandParentContentId() {
		return this.grand_parent_content_id;
	}

	/**
	 * 親コンテンツID を設定します.
	 * 
	 * @param parentContentId
	 *            親コンテンツID
	 */
	public void setParentContentId(Integer parentContentId) {
		this.parent_content_id = parentContentId;
	}

	/**
	 * 親コンテンツID を取得します.
	 * 
	 * @return 親コンテンツID
	 */
	public Integer getParentContentId() {
		return this.parent_content_id;
	}

	/**
	 * 報告日 を設定します.
	 * 
	 * @param reportDate
	 *            報告日
	 */
	public void setReportDate(Date reportDate) {
		this.report_date = reportDate;
	}

	/**
	 * 報告日 を取得します.
	 * 
	 * @return 報告日
	 */
	public Date getReportDate() {
		return this.report_date;
	}

	/**
	 * 作成日 を設定します.
	 * 
	 * @param createDate
	 *            作成日
	 */
	public void setCreateDate(Date createDate) {
		this.create_date = createDate;
	}

	/**
	 * 作成日 を取得します.
	 * 
	 * @return 作成日
	 */
	public Date getCreateDate() {
		return this.create_date;
	}

	/**
	 * 更新日 を設定します.
	 * 
	 * @param updateDated
	 *            更新日
	 */
	public void setUpdateDated(Date updateDated) {
		this.update_dated = updateDated;
	}

	/**
	 * 更新日 を取得します.
	 * 
	 * @return 更新日
	 */
	public Date getUpdateDated() {
		return this.update_dated;
	}

	/**
	 * コンテンツ追加情報 一覧を設定します.
	 * 
	 * @param recordContentAddSet
	 *            コンテンツ追加情報 一覧
	 */
	public void setRecordContentAddSet(Set<RecordContentAdd> recordContentAddSet) {
		this.recordContentAddSet = recordContentAddSet;
	}

	/**
	 * コンテンツ追加情報 を追加します.
	 * 
	 * @param recordContentAdd
	 *            コンテンツ追加情報
	 */
	public void addRecordContentAdd(RecordContentAdd recordContentAdd) {
		this.recordContentAddSet.add(recordContentAdd);
	}

	/**
	 * コンテンツ追加情報 一覧を取得します.
	 * 
	 * @return コンテンツ追加情報 一覧
	 */
	public Set<RecordContentAdd> getRecordContentAddSet() {
		return this.recordContentAddSet;
	}

	/**
	 * コンテンツ詳細 一覧を設定します.
	 * 
	 * @param recordContentDetailSet
	 *            コンテンツ詳細 一覧
	 */
	public void setRecordContentDetailSet(Set<RecordContentDetail> recordContentDetailSet) {
		this.recordContentDetailSet = recordContentDetailSet;
	}

	/**
	 * コンテンツ詳細 を追加します.
	 * 
	 * @param recordContentDetail
	 *            コンテンツ詳細
	 */
	public void addRecordContentDetail(RecordContentDetail recordContentDetail) {
		this.recordContentDetailSet.add(recordContentDetail);
	}

	/**
	 * コンテンツ詳細 一覧を取得します.
	 * 
	 * @return コンテンツ詳細 一覧
	 */
	public Set<RecordContentDetail> getRecordContentDetailSet() {
		return this.recordContentDetailSet;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content_id == null) ? 0 : content_id.hashCode());
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
		RecordContentInf other = (RecordContentInf) obj;
		if (content_id == null) {
			if (other.content_id != null) {
				return false;
			}
		} else if (!content_id.equals(other.content_id)) {
			return false;
		}
		return true;
	}


}
