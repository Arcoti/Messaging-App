import { Alert, AlertDescription } from '@/components/ui/alert'

interface ErrorMessageProps {
    description: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ description }) => {
    if (!description) return null

    return (
        <Alert variant="destructive" className="max-w-md mx-auto mt-4 bg-red-100 mb-4">
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}

export default ErrorMessage