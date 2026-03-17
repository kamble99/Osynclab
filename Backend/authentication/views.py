from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"error": "Missing fields"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User created successfully"})


@api_view(['POST'])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    })


@api_view(['GET', 'POST'])
def semaphore(request):

    # Optional: take input from frontend
    processes = request.data.get("processes", ["P1", "P2", "P3"])
    semaphore_value = int(request.data.get("semaphore", 1))

    result = []

    for p in processes:
        if semaphore_value > 0:
            semaphore_value -= 1
            result.append({
                "process": p,
                "state": "Critical Section"
            })
            semaphore_value += 1
        else:
            result.append({
                "process": p,
                "state": "Waiting"
            })

    return Response({
        "result": result
    })




@api_view(['POST'])
def deadlock(request):
    processes = request.data.get("processes")
    available = request.data.get("available")
    request_matrix = request.data.get("request")

    n = len(processes)
    m = len(available)

    executable = []

    for i in range(n):
        can_run = True
        for j in range(m):
            if request_matrix[i][j] > available[j]:
                can_run = False
                break

        if can_run:
            executable.append(processes[i])

    if len(executable) == 0:
        return Response({
            "status": "Deadlock",
            "message": "All processes are waiting ❌"
        })
    else:
        return Response({
            "status": "No Deadlock",
            "message": f"Process {executable[0]} can execute ✅"
        })

@api_view(['POST'])
def scheduler(request):
    processes = request.data.get("processes")
    arrival = request.data.get("arrival")
    burst = request.data.get("burst")
    algorithm = request.data.get("algorithm")
    quantum = request.data.get("quantum", 2)

    n = len(processes)

    result = []
    gantt = []

  
    if algorithm == "FCFS":
        time = 0
        for i in range(n):
            start = max(time, arrival[i])
            end = start + burst[i]

            gantt.append({"process": processes[i], "start": start, "end": end})

            wt = start - arrival[i]
            tat = end - arrival[i]

            result.append({
                "process": processes[i],
                "waiting": wt,
                "turnaround": tat
            })

            time = end

  
    elif algorithm == "SJF":
        completed = [False] * n
        time = 0

        for _ in range(n):
            idx = -1
            min_bt = float('inf')

            for i in range(n):
                if not completed[i] and arrival[i] <= time and burst[i] < min_bt:
                    min_bt = burst[i]
                    idx = i

            if idx == -1:
                time += 1
                continue

            start = time
            end = time + burst[idx]

            gantt.append({"process": processes[idx], "start": start, "end": end})

            wt = start - arrival[idx]
            tat = end - arrival[idx]

            result.append({
                "process": processes[idx],
                "waiting": wt,
                "turnaround": tat
            })

            completed[idx] = True
            time = end

    # 🔴 Round Robin
    elif algorithm == "RR":
        queue = list(range(n))
        remaining = burst[:]
        time = 0

        while queue:
            i = queue.pop(0)

            if remaining[i] > 0:
                start = time
                exec_time = min(quantum, remaining[i])
                time += exec_time
                remaining[i] -= exec_time

                gantt.append({
                    "process": processes[i],
                    "start": start,
                    "end": time
                })

                if remaining[i] > 0:
                    queue.append(i)
                else:
                    wt = time - arrival[i] - burst[i]
                    tat = time - arrival[i]

                    result.append({
                        "process": processes[i],
                        "waiting": wt,
                        "turnaround": tat
                    })

    return Response({
        "result": result,
        "gantt": gantt
    })