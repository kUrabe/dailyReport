package dailyReport.resource;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
@Table(name="fixed_item_inf")
public class FixedItemInf implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** 固定項目ID. */
	@Id
	@Column(name="fixed_item_id")
	private Integer fixedItemId;

	/** 項目状態. */
	@Column(name="item_status")
	private Integer itemStatus;

	/** 出力順序. */
	@Column(name="output_order")
	private Integer outputOrder;

	/** 見出し名. */
	@Column(name="index_name")
	private String indexName;

	/** ボタン機能. */
	@Column(name="button_function")
	private Integer buttonFunction;

	/** ボタン名. */
	@Column(name="button_name")
	private String buttonName;

	/** 取得ボタン名. */
	@Column(name="get_index_name")
	private String getIndexName;

	/** コンテンツ詳細 一覧. */
	@OneToMany
	@JoinColumn(name="fixed_item_id", insertable=false, updatable=false)
	private Set<RecordContentDetail> recordContentDetailSet;

	/**
	 * コンストラクタ.
	 */
	public FixedItemInf() {
		this.recordContentDetailSet = new HashSet<RecordContentDetail>();
	}

	/**
	 * 固定項目ID を設定します.
	 * 
	 * @param fixedItemId
	 *            固定項目ID
	 */
	public void setFixedItemId(Integer fixedItemId) {
		this.fixedItemId = fixedItemId;
	}

	/**
	 * 固定項目ID を取得します.
	 * 
	 * @return 固定項目ID
	 */
	public Integer getFixedItemId() {
		return this.fixedItemId;
	}

	/**
	 * 項目状態 を設定します.
	 * 
	 * @param itemStatus
	 *            項目状態
	 */
	public void setItemStatus(Integer itemStatus) {
		this.itemStatus = itemStatus;
	}

	/**
	 * 項目状態 を取得します.
	 * 
	 * @return 項目状態
	 */
	public Integer getItemStatus() {
		return this.itemStatus;
	}

	/**
	 * 出力順序 を設定します.
	 * 
	 * @param outputOrder
	 *            出力順序
	 */
	public void setOutputOrder(Integer outputOrder) {
		this.outputOrder = outputOrder;
	}

	/**
	 * 出力順序 を取得します.
	 * 
	 * @return 出力順序
	 */
	public Integer getOutputOrder() {
		return this.outputOrder;
	}

	/**
	 * 見出し名 を設定します.
	 * 
	 * @param indexName
	 *            見出し名
	 */
	public void setIndexName(String indexName) {
		this.indexName = indexName;
	}

	/**
	 * 見出し名 を取得します.
	 * 
	 * @return 見出し名
	 */
	public String getIndexName() {
		return this.indexName;
	}

	/**
	 * ボタン機能 を設定します.
	 * 
	 * @param buttonFunction
	 *            ボタン機能
	 */
	public void setButtonFunction(Integer buttonFunction) {
		this.buttonFunction = buttonFunction;
	}

	/**
	 * ボタン機能 を取得します.
	 * 
	 * @return ボタン機能
	 */
	public Integer getButtonFunction() {
		return this.buttonFunction;
	}

	/**
	 * ボタン名 を設定します.
	 * 
	 * @param buttonName
	 *            ボタン名
	 */
	public void setButtonName(String buttonName) {
		this.buttonName = buttonName;
	}

	/**
	 * ボタン名 を取得します.
	 * 
	 * @return ボタン名
	 */
	public String getButtonName() {
		return this.buttonName;
	}

	/**
	 * 取得ボタン名 を設定します.
	 * 
	 * @param getIndexName
	 *            取得ボタン名
	 */
	public void setGetIndexName(String getIndexName) {
		this.getIndexName = getIndexName;
	}

	/**
	 * 取得ボタン名 を取得します.
	 * 
	 * @return 取得ボタン名
	 */
	public String getGetIndexName() {
		return this.getIndexName;
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
		result = prime * result + ((fixedItemId == null) ? 0 : fixedItemId.hashCode());
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
		FixedItemInf other = (FixedItemInf) obj;
		if (fixedItemId == null) {
			if (other.fixedItemId != null) {
				return false;
			}
		} else if (!fixedItemId.equals(other.fixedItemId)) {
			return false;
		}
		return true;
	}

}

