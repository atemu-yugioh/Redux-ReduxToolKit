### `Handle error return from createAsyncThunk`

**Dùng TryCatch với các tác vụ gọi API đến Server `addPost`, `updatePost`**

1. Dùng phương thức rejectWithValue của ThunkAPI để conver định dạng lỗi sang định dạng giống server trả về.
2. Sau mỗi lần dispatch(lên server) thì dùng thêm phương thức là unwrap()
3. Muốn lấy response thì dùng phương thức unwrapResult()

VD:

```
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingPost) {
        // Cách dùng với promise
      dispatch(updatePost({ postId: postId, body: body }))
        .unwrap()
        .then((res) => {
        })
        .catch((err) => setErrorForm(err.error))
    } else {
        // cách dùng với async/await
      try {
        await dispatch(addPost(formData)).unwrap()

        // Nếu muốn lấy res thì làm như sau
        // const res = await dispatch(addPost(formData))
        // console.log(unwrapResult())

        // ** Bắt buộc phải có unwrap() hoặc unwrapResult() nếu không khi xảy ra lỗi nó sẽ không rơi vào catch
        if (errorForm) {
          setErrorForm(null)
        }
        setFormData(initialState)
      } catch (error: any) {
        setErrorForm(error.error)
      }
    }
  }

```
