import pandas as pd
from sklearn.ensemble import RandomForestRegressor

def run_opsium_pipeline(csv_path="opsium_input.csv"):
    df = pd.read_csv(csv_path)

    # -------- Segment 1: Demand Forecasting --------
    features = ["promo_intensity", "sentiment_score", "sustainability_index"]
    X = df[features]
    y = df["units_sold"]

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)

    df["forecasted_demand"] = model.predict(X)

    # -------- Segment 2: Capacity Optimization --------
    df["allocated_kg"] = df[["forecasted_demand", "flight_capacity_kg"]].min(axis=1)
    df["utilization_pct"] = df["allocated_kg"] / df["flight_capacity_kg"]

    def pricing(util):
        if util > 0.85:
            return "Premium"
        elif util > 0.6:
            return "Standard"
        return "Discount"

    df["pricing_tier"] = df["utilization_pct"].apply(pricing)

    # Final output
    output_cols = [
        "date",
        "customer_id",
        "sku",
        "forecasted_demand",
        "flight_id",
        "allocated_kg",
        "utilization_pct",
        "pricing_tier"
    ]

    output = df[output_cols]
    output.to_csv("opsium_output.csv", index=False)

    return output


if __name__ == "__main__":
    result = run_opsium_pipeline()
    print(result.head())
