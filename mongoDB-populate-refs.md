On successful checkout on Stripe, during the same request and trip to the database.

```
const updateRunsAndUser = async (orderItems, userId) => {
  const user = await User.findById(userId);

  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i];
    console.log(item);
    const run = await Run.findById(item.run);
    const runId = run._id;
    user.runs.push({ runId });

    run.users.push({
      userId,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });
    await user.save();
    await run.save();
  }
};
```

1. Update created order ( order.isPaid === true )
2. Asynchronously call updateRunsAndUser(orderItems, userId)
3. Add User to each Run in the order aka the orderItems
   - const user = User.findById(userId)
   - iterate through orderItems
     - item = orderItem[i];
     - run = Run.findById(item.run)
     - user.runs.push({ run.\_id })
     - ```
        run.users.push({
            userId,
            username: user.username,
            profilePhoto: user.profilePhoto,
        });
       ```
     - await user.save(); await run.save()
4. redirect to "/" with success message, order.isPaid == true, user is added to run, run contains user as well.

Actual Behavior:

```
    sampleOrder = {
        "_id": { "$oid": "5fa43b8624b3da0a5d02797d" },
        "totalPrice": 10,
        "isPaid": true,
        "orderItems": [
            {
                "_id": { "$oid": "5fa43b8624b3da0a5d02797e" },
                "run": { "$oid": "5fa436adf1047f07cc1af8d1" },
                "name": "Wednesday Night Run",
                "price": 10,
                "location": "The Post",
                "date": "11-04-2020"
            }
        ],

        "userId": { "$oid": "5fa436adf1047f07cc1af8cd" },
        "paidAt": { "$date": "2020-11-05T17:51:13.378Z" }
    }

    sampleRunAfterCheckout = {
        "_id": { "$oid": "5fa436adf1047f07cc1af8d1" },
        "price": 10,
        "capacity": 15,
        "geoLocation": {
            "address": "100 Dobbin St, Brooklyn, NY 11222",
            "lat": 40.7251514,
            "lng": -73.9566612
        },
        "name": "Wednesday Night Run",
        "location": "The Post",
        "date": "11-04-2020",
        "users": [
            {
            "_id": { "$oid": "5fa43b9124b3da0a5d027980" },
            "userId": { "$oid": "5fa436adf1047f07cc1af8cd" },
            "username": "merkyoass"
            },
        ],
        "startTime": "9:00 PM",
        "endTime": "11:00 PM",
        "userId": {
            "$oid": "5fa436adf1047f07cc1af8cd"
        },
    }

    sampleUserAfterCheckout = {
        "_id": { "$oid": "5fa436adf1047f07cc1af8cd" },
        "isAdmin": true,
        "username": "merkyoass",
        "email": "dcampuzano101@gmail.com",
        "runs": [
            {
                "_id": { "$oid": "5fa43b9124b3da0a5d02797f" },
                "runId": { "$oid": "5fa436adf1047f07cc1af8d1" }
            }
        ],
    }
```

    runId found in all 3 documents,
        1. Order.orderItems[0].run === 5fa436adf1047f07cc1af8d1
        2. runObj, run._id === 5fa436adf1047f07cc1af8d1
        3. userObj, user.runs[0].runId === 5fa436adf1047f07cc1af8d1

    in each of Arrays, Order.orderItems & User.runs,
        1. Order.orderItems = [
            {
                "_id": { "$oid": "5fa43b8624b3da0a5d02797e" }, === where the hell is this coming from, it doesn't match any other objectIds
                "run": { "$oid": "5fa436adf1047f07cc1af8d1" },
            }
        ]

        2. User.runs = [
            {
                "_id": { "$oid": "5fa43b9124b3da0a5d02797f" }, === where the hell is this coming from? also does not match any other objectIds
                "runId": { "$oid": "5fa436adf1047f07cc1af8d1" }
            }
        ]

Ideal Behavior:
**_ if order.isPaid === true, automatically add userId to each orderItem.users Array, and add each orderItem.run (runId) to User.runs Array. _**

PROBLEMS: 1. manually adding documents / cross populating 2. making multiple queries to the DB. 3. must be a better more efficient method.

LIST OF BUGS TO FIX: 1. maybe only happens when deleting information from DB
a. On deletion of data, npm run data:destroy, User is destroyed however, localStorage.userInfo exists, however noone with those credentials match in DB.
1.Solution : ????

    2. make stripe checkout page more secure looking
        2.Solution : "Powered By Stripe" Check out their official demo, to see expected behavior / results.

    3. fix userList on <RunList /> usernames not justified / aligned

    4. fix table margin on bottom, fix background color to make it pop, think eggshell for real rooms.

    5. dynamically add geocoded lat + lng from NodeJs Google Map API client
