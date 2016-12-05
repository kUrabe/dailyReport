package dailyReport.resource;

import java.io.Serializable;

import javax.persistence.*;

//TODO:【未実装】複合主キーに対する対処は未
// getContentDetail Top画面のアコーディオン内検索
// getReportByDay 日報作成画面の日付選択による詳細取得
// getBeforePlan 前日以前の予定を取得する(未実装 1行更新)
// updateContent 日報・コメント作成画面のアップデート前の詳細削除
@Entity
@Table(name="record_content_detail")
@SqlResultSetMappings({
	@SqlResultSetMapping(
			name="searchContentDetailSummary", 
			classes = @ConstructorResult(
					targetClass = dailyReport.resource.SearchContentDetailSummary.class, 
					columns = {
							@ColumnResult(name = "content_id"),
							@ColumnResult(name = "detail_id"),
							@ColumnResult(name = "fixed_item_id"),
							@ColumnResult(name = "index_name"),
							@ColumnResult(name = "main_text")
					}
			)
	),
	@SqlResultSetMapping(
			name="getReportByDayQuery", 
			classes = @ConstructorResult(
					targetClass = dailyReport.resource.GetReportByDayQuery.class, 
					columns = {
							@ColumnResult(name = "content_id"),
							@ColumnResult(name = "detail_id"),
							@ColumnResult(name = "fixed_item_id"),
							@ColumnResult(name = "index_name"),
							@ColumnResult(name = "main_text"),
							@ColumnResult(name = "item_status"),
							@ColumnResult(name = "output_order"),
							@ColumnResult(name = "index_name"),
							@ColumnResult(name = "button_function"),
							@ColumnResult(name = "button_name"),
							@ColumnResult(name = "get_index_name")
					}
			)
	)
})
public class RecordContentDetail implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	// 主キー
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	/** レコード情報. */
	@ManyToOne
	@JoinColumn(name="content_id", insertable=true, updatable=true)
	private RecordContentInf recordContentInf;

	/** 詳細ID. */
	@Column(name="detail_id")
	private Integer detail_id;

	/** 固定項目情報. */
	@ManyToOne
	@JoinColumn(name="fixed_item_id", insertable=true, updatable=true)
	private FixedItemInf fixedItemInf;

	/** 項目名. */
	@Column(name="index_name")
	private String index_name;

	/** 内容. */
	@Column(name="main_text")
	private String main_text;

	/**
	 * コンストラクタ.
	 */
	public RecordContentDetail() {
	}

	/**
	 * レコード情報 を設定します.
	 * 
	 * @param recordContentInf
	 *            レコード情報
	 */
	public void setRecordContentInf(RecordContentInf recordContentInf) {
		this.recordContentInf = recordContentInf;
	}

	/**
	 * レコード情報 を取得します.
	 * 
	 * @return レコード情報
	 */
	public RecordContentInf getRecordContentInf() {
		return this.recordContentInf;
	}

	/**
	 * 詳細ID を設定します.
	 * 
	 * @param detailId
	 *            詳細ID
	 */
	public void setDetailId(Integer detailId) {
		this.detail_id = detailId;
	}

	/**
	 * 詳細ID を取得します.
	 * 
	 * @return 詳細ID
	 */
	public Integer getDetailId() {
		return this.detail_id;
	}

	/**
	 * 固定項目情報 を設定します.
	 * 
	 * @param fixedItemInf
	 *            固定項目情報
	 */
	public void setFixedItemInf(FixedItemInf fixedItemInf) {
		this.fixedItemInf = fixedItemInf;
	}

	/**
	 * 固定項目情報 を取得します.
	 * 
	 * @return 固定項目情報
	 */
	public FixedItemInf getFixedItemInf() {
		return this.fixedItemInf;
	}

	/**
	 * 項目名 を設定します.
	 * 
	 * @param indexName
	 *            項目名
	 */
	public void setIndexName(String indexName) {
		this.index_name = indexName;
	}

	/**
	 * 項目名 を取得します.
	 * 
	 * @return 項目名
	 */
	public String getIndexName() {
		return this.index_name;
	}

	/**
	 * 内容 を設定します.
	 * 
	 * @param mainText
	 *            内容
	 */
	public void setMainText(String mainText) {
		this.main_text = mainText;
	}

	/**
	 * 内容 を取得します.
	 * 
	 * @return 内容
	 */
	public String getMainText() {
		return this.main_text;
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
		RecordContentDetail other = (RecordContentDetail) obj;
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
