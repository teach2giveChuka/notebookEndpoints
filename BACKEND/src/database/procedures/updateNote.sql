CREATE OR ALTER PROCEDURE updatenote(
    @note_id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255)
)
AS
BEGIN
    UPDATE notes SET id=@note_id, title=@title, content=@content WHERE note_id=@note_id
END