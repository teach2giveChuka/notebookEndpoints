CREATE OR ALTER PROCEDURE createNote(
    @note_id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255)

)
AS  BEGIN
    INSERT INTO notes (id, title, content, createdAt)
    VALUES (@note_id, @title, @content)
    END