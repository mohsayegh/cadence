import httpx

BASE = "http://127.0.0.1:8000"


def test_api():
    # 1. GET the starting list
    res = httpx.get(f"{BASE}/habits")
    assert res.status_code == 200, f"GET failed: {res.status_code}"
    starting = res.json()
    print(f"GET /habits -> {len(starting)} habits, status {res.status_code}")

    # 2. POST a new habit
    res = httpx.post(f"{BASE}/habits", json={"name": "Test Habit"})
    assert res.status_code == 201, f"POST failed: {res.status_code}"
    created = res.json()
    new_id = created["id"]
    assert created["name"] == "Test Habit"
    assert created["isDone"] is False
    assert created["streak"] == 0
    print(f"POST /habits -> created id {new_id}, status {res.status_code}")

    # 3. PATCH toggle it (was False, should become True)
    res = httpx.patch(f"{BASE}/habits/{new_id}/toggle")
    assert res.status_code == 200, f"PATCH failed: {res.status_code}"
    toggled = res.json()
    assert toggled["isDone"] is True, "toggle did not flip isDone"
    print(f"PATCH /habits/{new_id}/toggle -> isDone now {toggled['isDone']}")

    # 4. PATCH a habit that doesn't exist -> should 404
    res = httpx.patch(f"{BASE}/habits/999999/toggle")
    assert res.status_code == 404, f"expected 404, got {res.status_code}"
    print(f"PATCH /habits/999999/toggle -> {res.status_code} (correctly not found)")

    # 5. DELETE the test habit
    res = httpx.delete(f"{BASE}/habits/{new_id}")
    assert res.status_code == 204, f"DELETE failed: {res.status_code}"
    print(f"DELETE /habits/{new_id} -> status {res.status_code}")

    # 6. GET again, confirm it's gone and we're back to the starting count
    res = httpx.get(f"{BASE}/habits")
    ids = [h["id"] for h in res.json()]
    assert new_id not in ids, "deleted habit still present"
    assert len(res.json()) == len(starting), "list length did not return to start"
    print(f"GET /habits -> back to {len(res.json())} habits, delete confirmed")

    print("\nAll tests passed.")


if __name__ == "__main__":
    test_api()