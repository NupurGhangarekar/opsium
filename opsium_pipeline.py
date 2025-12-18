import pandas as pd
df = pd.read_csv("/content/dataset.csv")
X = df[["promo_active", "sustainability_index", "sentiment_score"]]
y = df["demand_units"]
from sklearn.ensemble import RandomForestRegressor

rf = RandomForestRegressor(
    n_estimators=200,
    max_depth=5,        # keeps it crude & explainable
    random_state=42
)

rf.fit(X, y)
future = pd.DataFrame({
    "promo_active": [1, 0, 1, 0],
    "sustainability_index": [0.92, 0.93, 0.94, 0.95],
    "sentiment_score": [0.85, 0.80, 0.88, 0.90]
})

forecast = rf.predict(future)

forecast_df = pd.DataFrame({
    "week": ["2024-08-05", "2024-08-12", "2024-08-19", "2024-08-26"],
    "forecasted_demand_units": forecast.astype(int)
})
importances = pd.Series(
    rf.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print(importances)
base = pd.DataFrame({
    "promo_active": [0],
    "sustainability_index": [0.90],
    "sentiment_score": [0.85]
})

promo = base.copy()
promo["promo_active"] = 1

impact = rf.predict(promo) - rf.predict(base)
low_sus = pd.DataFrame({
    "promo_active": [0],
    "sustainability_index": [0.60],
    "sentiment_score": [0.40]
})

high_sus = low_sus.copy()
high_sus["sustainability_index"] = 0.90

rf.predict(high_sus) - rf.predict(low_sus)
forecast_df
