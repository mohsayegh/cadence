import httpx
import uuid

BASE = "http://127.0.0.1:8000"


def get_token():
    email = f"test-{uuid.uuid4().hex[:8]}@test.com"
    password = "test123"

    res = httpx.post(f"{BASE}/signup", json={"email": email, "password": password})
    assert res.status_code == 201, f"signup failed: {res.status_code} {res.text}"

    res = httpx.post(f"{BASE}/login", data={"username": email, "password": password})
    assert res.status_code == 200, f"login failed: {res.status_code} {res.text}"
    return res.json()["access_token"]


def test_auth():
    email = f"test-{uuid.uuid4().hex[:8]}@test.com"
    res = httpx.post(f"{BASE}/signup", json={"email": email, "password": "test123"})
    assert res.status_code == 201
    print(f"POST /signup -> created {res.json()['email']}")

    res = httpx.post(f"{BASE}/signup", json={"email": email, "password": "test123"})
    assert res.status_code == 400
    print("POST /signup (duplicate) -> 400")

    res = httpx.post(f"{BASE}/login", data={"username": email, "password": "test123"})
    assert res.status_code == 200 and res.json()["access_token"]
    print("POST /login -> token received")

    res = httpx.post(f"{BASE}/login", data={"username": email, "password": "wrong"})
    assert res.status_code == 401
    print("POST /login (wrong password) -> 401")


def test_protection():
    # no token -> should be rejected
    res = httpx.get(f"{BASE}/habits")
    assert res.status_code == 401, f"expected 401 without token, got {res.status_code}"
    print("GET /habits (no token) -> 401 (correctly protected)")


def test_isolation(headers):
    # a second user should NOT see the first user's habit
    other = {"Authorization": f"Bearer {get_token()}"}
    httpx.post(f"{BASE}/habits", json={"name": "User A habit"}, headers=headers)
    res = httpx.get(f"{BASE}/habits", headers=other)
    names = [h["name"] for h in res.json()]
    assert "User A habit" not in names, "user B can see user A's data!"
    print("GET /habits (other user) -> cannot see first user's habits (isolated)")


def test_habits(headers):
    res = httpx.get(f"{BASE}/habits", headers=headers)
    assert res.status_code == 200
    print(f"GET /habits -> {len(res.json())} habits")

    res = httpx.post(f"{BASE}/habits", json={"name": "Test Habit"}, headers=headers)
    assert res.status_code == 201, f"POST failed: {res.status_code} {res.text}"
    hid = res.json()["id"]
    print(f"POST /habits -> created id {hid}")

    res = httpx.patch(f"{BASE}/habits/{hid}/toggle", headers=headers)
    assert res.status_code == 200 and res.json()["isDone"] is True
    print(f"PATCH /habits/{hid}/toggle -> isDone True")

    res = httpx.delete(f"{BASE}/habits/{hid}", headers=headers)
    assert res.status_code == 204
    print(f"DELETE /habits/{hid} -> 204")


def test_goals(headers):
    res = httpx.post(f"{BASE}/goals", json={"title": "Test Goal", "target": 3}, headers=headers)
    assert res.status_code == 201, f"POST failed: {res.status_code} {res.text}"
    gid = res.json()["id"]
    print(f"POST /goals -> created id {gid}, 0/3")

    httpx.patch(f"{BASE}/goals/{gid}/increment", headers=headers)
    httpx.patch(f"{BASE}/goals/{gid}/increment", headers=headers)
    httpx.patch(f"{BASE}/goals/{gid}/increment", headers=headers)
    res = httpx.patch(f"{BASE}/goals/{gid}/increment", headers=headers)  # past target
    assert res.json()["current"] == 3, f"cap failed: {res.json()['current']}"
    print("PATCH increment past target -> capped at 3")

    res = httpx.delete(f"{BASE}/goals/{gid}", headers=headers)
    assert res.status_code == 204
    print(f"DELETE /goals/{gid} -> 204")


def test_tasks(headers):
    res = httpx.post(f"{BASE}/tasks", json={"title": "Test Task"}, headers=headers)
    assert res.status_code == 201, f"POST failed: {res.status_code} {res.text}"
    tid = res.json()["id"]
    print(f"POST /tasks -> created id {tid}")

    res = httpx.patch(f"{BASE}/tasks/{tid}/toggle", headers=headers)
    assert res.status_code == 200 and res.json()["isDone"] is True
    print(f"PATCH /tasks/{tid}/toggle -> isDone True")

    res = httpx.delete(f"{BASE}/tasks/{tid}", headers=headers)
    assert res.status_code == 204
    print(f"DELETE /tasks/{tid} -> 204")


if __name__ == "__main__":
    print("--- auth ---")
    test_auth()
    print("\n--- protection ---")
    test_protection()

    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}

    print("\n--- isolation ---")
    test_isolation(headers)
    print("\n--- habits ---")
    test_habits(headers)
    print("\n--- goals ---")
    test_goals(headers)
    print("\n--- tasks ---")
    test_tasks(headers)
    print("\nAll tests passed.")