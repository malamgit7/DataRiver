export class CreateFileSystemModel {
    ConnectionStringId!: string
    FileSystem!: string
}

export class CreateDirectoryModel {
    ConnectionStringId!: string
    FileSystem!: string
    Path_Directory!: string
}

export class RenameBlobModel {
    ConnectionStringId!: string
    FileSystem!: string;
    Path_Blob_old!: string;
    Path_Blob_New!: string
}