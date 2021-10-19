# miniScocialMediaAPI
An API which take request for uploading posts to different groups on a platform and displaying posts under different conditions
#requests/API endpoints with required data
for endpoint  /api/v1/users  ->
GET - all the users
/signup POST require fields name, email, password, passwordConfirm
/login POST require fields email password
/join PATCH to join a group -> required field group(groupid)
/leave PATCH to leave a group -> required field group(groupid)

for endpoint /api/v1/groups ->
GET - all the groups
POST - create a group required fields name 
/:id GET all the posts in the partiular group by groupid

for endpoint /api/v1/posts ->
POST create a post required fields heading, caption(optional), multimedia(optional), group(groupid) in which group post is to be posted
/feed GET Generate feed for a group 
/like-button PATCH like a post or unlike a post required field post(postid)
/:id GET getting a post with comments

for endpoint /api/v1/comments ->
POST create a comment required fields comment, post(postid);
